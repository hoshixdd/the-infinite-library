"use client";

/** CSS volumetric light shafts through dust */
export function LightShaft({
  className = "",
  warm = true,
}: {
  className?: string;
  warm?: boolean;
}) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden
    >
      <div className={`light-shaft light-shaft--a ${warm ? "light-shaft--warm" : "light-shaft--cool"}`} />
      <div className={`light-shaft light-shaft--b ${warm ? "light-shaft--warm" : "light-shaft--cool"}`} />
      <div className="dust-motes" />
    </div>
  );
}
