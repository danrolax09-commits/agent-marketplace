import { NextRequest, NextResponse } from "next/server";
import { searchEngine } from "@/services/search/search-engine";

// Search agents
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const query = {
      q: searchParams.get("q") || undefined,
      category: searchParams.get("category") || undefined,
      priceMin: searchParams.get("priceMin") ? parseInt(searchParams.get("priceMin")!) : undefined,
      priceMax: searchParams.get("priceMax") ? parseInt(searchParams.get("priceMax")!) : undefined,
      rating: searchParams.get("rating") ? parseInt(searchParams.get("rating")!) : undefined,
      sortBy: (searchParams.get("sortBy") as any) || "popular",
      limit: searchParams.get("limit") ? parseInt(searchParams.get("limit")!) : 20,
      offset: searchParams.get("offset") ? parseInt(searchParams.get("offset")!) : 0,
    };

    // Get search suggestions if only 'q' is provided
    if (query.q && !searchParams.has("category")) {
      const suggestions = searchEngine.getSuggestions(query.q);
      return NextResponse.json({ suggestions });
    }

    // Perform search
    const results = searchEngine.search(query);
    const facets = searchEngine.getFacets();

    return NextResponse.json({
      results,
      total: results.length,
      facets,
      page: Math.floor((query.offset || 0) / (query.limit || 20)) + 1,
    });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

// Get search trends and popular searches
export async function POST(req: NextRequest) {
  try {
    const { action } = await req.json();

    if (action === "popular") {
      const popular = searchEngine.getPopularSearches();
      return NextResponse.json({ popular });
    }

    if (action === "facets") {
      const facets = searchEngine.getFacets();
      return NextResponse.json(facets);
    }

    return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
