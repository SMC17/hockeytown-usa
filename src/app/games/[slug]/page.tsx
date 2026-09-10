import { EntityPage, prettyEntityParams } from "@/components/entity-page";

export function generateStaticParams() {
  return prettyEntityParams("game");
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <EntityPage type="game" slug={slug} />;
}
