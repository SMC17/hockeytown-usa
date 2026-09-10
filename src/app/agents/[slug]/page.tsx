import { EntityPage, prettyEntityParams } from "@/components/entity-page";

export function generateStaticParams() {
  return prettyEntityParams("agent");
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <EntityPage type="agent" slug={slug} />;
}
