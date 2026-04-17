import { PolicySection } from "@/_types/privacyPolicy.types";

export const PolicySectionRenderer: React.FC<PolicySection> = ({
  title,
  points,
}) => (
  <div className="group">
    <h2 className="text-[clamp(1rem,calc(0.795rem+1.023vw),1.563rem)] font-semibold text-heading mb-6 border-b pb-2">
      {title}
    </h2>
    <ul className="list-disc pl-5 space-y-4 text-para text-[clamp(0.625rem,calc(0.398rem+1.136vw),1.25rem)]">
      {points.map((point, index) => (
        <li key={index} className="pl-2">
          {point.label ? (
            <span className="font-semibold text-para">{point.label}:</span>
          ) : null}{" "}
          {point.description}
        </li>
      ))}
    </ul>
  </div>
);
