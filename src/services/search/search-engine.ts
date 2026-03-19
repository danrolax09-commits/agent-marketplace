// Advanced search engine for Agent Marketplace
// Supports: Full-text search, filters, sorting

export interface SearchQuery {
  q?: string;
  category?: string;
  priceMin?: number;
  priceMax?: number;
  rating?: number;
  sortBy?: "popular" | "newest" | "price_low" | "price_high" | "rating";
  limit?: number;
  offset?: number;
}

export interface SearchResult {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  rating: number;
  reviews: number;
  seller: string;
  features: string[];
  createdAt: Date;
  updatedAt: Date;
}

class SearchEngine {
  // Simple in-memory search (upgrade to Elasticsearch for production)
  private agents: SearchResult[] = [];

  // Index agent for searching
  indexAgent(agent: SearchResult) {
    this.agents.push(agent);
  }

  // Full-text search
  search(query: SearchQuery): SearchResult[] {
    let results = [...this.agents];

    // Text search
    if (query.q) {
      const q = query.q.toLowerCase();
      results = results.filter(
        (agent) =>
          agent.name.toLowerCase().includes(q) ||
          agent.description.toLowerCase().includes(q) ||
          agent.features.some((f) => f.toLowerCase().includes(q))
      );
    }

    // Filter by category
    if (query.category) {
      results = results.filter((a) => a.category === query.category);
    }

    // Filter by price range
    if (query.priceMin !== undefined) {
      results = results.filter((a) => a.price >= (query.priceMin as number));
    }
    if (query.priceMax !== undefined) {
      results = results.filter((a) => a.price <= (query.priceMax as number));
    }

    // Filter by minimum rating
    if (query.rating !== undefined) {
      results = results.filter((a) => a.rating >= (query.rating as number));
    }

    // Sort
    const sortBy = query.sortBy || "popular";
    results.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return b.createdAt.getTime() - a.createdAt.getTime();
        case "price_low":
          return a.price - b.price;
        case "price_high":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        case "popular":
        default:
          return b.reviews - a.reviews;
      }
    });

    // Pagination
    const offset = query.offset || 0;
    const limit = Math.min(query.limit || 20, 100);

    return results.slice(offset, offset + limit);
  }

  // Get search suggestions
  getSuggestions(q: string): string[] {
    const query = q.toLowerCase();
    const suggestions = new Set<string>();

    this.agents.forEach((agent) => {
      // Suggest agent names
      if (agent.name.toLowerCase().includes(query)) {
        suggestions.add(agent.name);
      }

      // Suggest categories
      if (agent.category.toLowerCase().includes(query)) {
        suggestions.add(agent.category);
      }

      // Suggest features
      agent.features.forEach((feature) => {
        if (feature.toLowerCase().includes(query)) {
          suggestions.add(feature);
        }
      });
    });

    return Array.from(suggestions).slice(0, 5);
  }

  // Get popular searches
  getPopularSearches(): string[] {
    return [
      "AI Writing Assistant",
      "Data Analysis Agent",
      "Content Creator",
      "Code Generator",
      "Marketing Automation",
    ];
  }

  // Get facets for filtering
  getFacets() {
    const categories = new Set<string>();
    const priceRanges: Record<string, number> = {
      "0-50": 0,
      "50-100": 0,
      "100-500": 0,
      "500+": 0,
    };
    const ratingBuckets: Record<number, number> = {
      5: 0,
      4: 0,
      3: 0,
      2: 0,
      1: 0,
    };

    this.agents.forEach((agent) => {
      categories.add(agent.category);

      // Price buckets
      if (agent.price < 50) priceRanges["0-50"]++;
      else if (agent.price < 100) priceRanges["50-100"]++;
      else if (agent.price < 500) priceRanges["100-500"]++;
      else priceRanges["500+"]++;

      // Rating buckets
      const rating = Math.floor(agent.rating);
      if (rating <= 5) ratingBuckets[rating]++;
    });

    return {
      categories: Array.from(categories),
      priceRanges,
      ratings: ratingBuckets,
      totalAgents: this.agents.length,
    };
  }
}

export const searchEngine = new SearchEngine();
