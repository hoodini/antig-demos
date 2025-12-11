
import { NextResponse } from 'next/server';
import { scrapeAITrends } from '@/lib/scraper';
import { trends as staticTrends } from '@/lib/data';

export async function GET() {
    try {
        // 1. Fetch live scraped trends
        const scrapedTrends = await scrapeAITrends();

        // 2. Combine with static/featured trends
        // In a real app, you might save scraped trends to a DB and merge them intelligently.
        // For this demo, we verify if scraping worked; if empty, we just fallback or mix.
        const allTrends = [...staticTrends, ...scrapedTrends];

        // Remove duplicates if any (simple ID check)
        const uniqueTrends = Array.from(new Map(allTrends.map(item => [item.id, item])).values());

        return NextResponse.json({ trends: uniqueTrends });
    } catch (error) {
        console.error('API Error:', error);
        // Fallback to static data on failure
        return NextResponse.json({ trends: staticTrends, error: 'Failed to fetch new trends' });
    }
}
