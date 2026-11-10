type JsonLdProps = {
  data: Record<string, unknown> | Record<string, unknown>[];
};

/** Renders one or more JSON-LD objects. One script per object avoids graph collisions. */
export function JsonLd({ data }: JsonLdProps) {
  const payloads = Array.isArray(data) ? data : [data];
  return (
    <>
      {payloads.map((payload, index) => (
        <script
          // Stable order; schemas are static per mount.
          key={`${String(payload["@type"] ?? "schema")}-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
        />
      ))}
    </>
  );
}
