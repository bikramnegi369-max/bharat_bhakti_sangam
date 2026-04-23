"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useLayoutEffect,
  useEffect,
  useId,
} from "react";
import { usePathname } from "next/navigation";
import { useMountTransition } from "@/_hooks/useMountTransition";
import GlobalModal from "@/_components/common/GlobalModal";
import GlobalDrawer from "@/_components/common/GlobalDrawer";

const ANIM_MODAL = 250;
const ANIM_DRAWER = 300;

interface DrawerOptions {
  size?: "sm" | "md" | "lg" | "xl" | "full";
  width?: string;
  onClose?: () => void;
}

interface ModalOptions {
  size?: "sm" | "md" | "lg" | "xl" | "full";
  width?: string;
}

interface DrawerItem {
  id: string;
  content: ReactNode;
  options: DrawerOptions;
  isVisible: boolean; // required for exit animation
}

interface ModalItem {
  content: ReactNode;
  options: ModalOptions;
}

interface UIContextType {
  openModal: (content: ReactNode, options?: ModalOptions) => void;
  closeModal: () => void;

  openDrawer: (content: ReactNode, options?: DrawerOptions) => void;
  closeDrawer: () => void;
}

export const UIContext = createContext<UIContextType | null>(null);

export default function UIProvider({ children }: { children: ReactNode }) {
  /* -----------------------------------------------------------
   * Create portal roots BEFORE first paint
   * ----------------------------------------------------------- */
  useLayoutEffect(() => {
    if (typeof document === "undefined") return;

    const container = document.getElementById("__main-overlay-root");

    if (container) {
      if (!document.getElementById("__drawer-root")) {
        const d = document.createElement("div");
        d.id = "__drawer-root";
        container.appendChild(d);
      }
      if (!document.getElementById("__modal-root")) {
        const m = document.createElement("div");
        m.id = "__modal-root";
        container.appendChild(m);
      }
    }
  }, []);

  /* -----------------------------------------------------------
   * MODAL SYSTEM (unchanged)
   * ----------------------------------------------------------- */
  const [modalContent, setModalContent] = useState<ModalItem | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { isMounted: isModalMounted, isTransitioning: isModalInTransition } =
    useMountTransition(isModalVisible, ANIM_MODAL);

  const openModal = (content: ReactNode, options: ModalOptions = {}) => {
    setModalContent((prev) => ({ ...prev, content, options }));
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setModalContent(null);
  };

  /* -----------------------------------------------------------
   * DRAWER STACK SYSTEM (with exit animations)
   * ----------------------------------------------------------- */
  const [drawerStack, setDrawerStack] = useState<DrawerItem[]>([]);
  const uniqueiD = useId();

  const openDrawer = (content: ReactNode, options: DrawerOptions = {}) => {
    setDrawerStack((prev) => [
      ...prev,
      {
        id: uniqueiD,
        content,
        options,
        isVisible: true, // animate IN
      },
    ]);
  };

  const closeDrawer = () => {
    setDrawerStack((prev) => {
      if (prev.length === 0) return prev;
      if (!prev[prev.length - 1].isVisible) return prev;

      const topIndex = prev.length - 1;
      const updated = [...prev];

      updated[topIndex] = {
        ...updated[topIndex],
        isVisible: false, // trigger exit animation
      };

      // Store the ID of the drawer to be removed
      const drawerIdToRemove = updated[topIndex].id;

      setTimeout(() => {
        // Remove only the drawer with the matching ID
        setDrawerStack((prev2) =>
          prev2.filter((drawer) => drawer.id !== drawerIdToRemove),
        );
      }, ANIM_DRAWER);

      return updated;
    });
  };

  const pathname = usePathname();

  useEffect(() => {
    // This effect runs when pathname changes
    // Return a cleanup that will run BEFORE the next effect
    return () => {
      // Close all drawers when navigating away
      setDrawerStack((prev) => {
        if (prev.length === 0) return prev;

        // Trigger exit animation for all drawers
        const updated = prev.map((drawer) => ({ ...drawer, isVisible: false }));

        // After animation, clear the stack
        setTimeout(() => {
          setDrawerStack([]);
        }, ANIM_DRAWER);

        return updated;
      });

      closeModal();
    };
  }, [pathname]);

  /* -----------------------------------------------------------
   * OUTPUT / RENDER
   * ----------------------------------------------------------- */
  return (
    <UIContext.Provider
      value={{
        openModal,
        closeModal,
        openDrawer,
        closeDrawer, // close one
      }}
    >
      {children}

      {/* ---------------- MODAL RENDER ---------------- */}
      {isModalMounted && (
        <GlobalModal
          open={isModalInTransition}
          onClose={closeModal}
          animationMs={ANIM_MODAL}
          size={modalContent?.options.size}
          width={modalContent?.options.width}
        >
          {modalContent?.content}
        </GlobalModal>
      )}

      {/* ---------------- STACKED DRAWER RENDER ---------------- */}
      {drawerStack.map((drawer, index) => {
        const isTop = index === drawerStack.length - 1;

        return (
          <GlobalDrawer
            key={drawer.id}
            open={drawer.isVisible}
            onClose={isTop ? closeDrawer : undefined}
            animationMs={ANIM_DRAWER}
            size={drawer.options.size}
            width={drawer.options.width}
            zIndex={100 + index}
            disableBackdrop={!isTop}
          >
            {drawer.content}
          </GlobalDrawer>
        );
      })}
    </UIContext.Provider>
  );
}

export const useUI = () => {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error("useUI must be used inside <UIProvider>");
  return ctx;
};
