type Props = {
  copyright: string;
};

export function FooterBottom({ copyright }: Props) {
  return (
    <div className="border-t border-white/20 pt-6 mt-10 text-sm text-white/60 text-center">
      {copyright}
    </div>
  );
}
