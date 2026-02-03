import { Brief, Citation, VerificationResult } from '../types';
import { allSampleBriefs } from '../data/sampleBrief';

interface CitationDetails {
  citation: Citation;
  result: VerificationResult;
}

/**
 * Mock API service for fetching brief data
 * Simulates network delay for loading states
 */
export const briefApi = {
  /**
   * Fetches a brief by ID
   * @param briefId - The ID of the brief to fetch
   * @returns Promise that resolves to a Brief after a simulated delay
   */
  async fetchBrief(briefId: string): Promise<Brief> {
    // Simulate network delay (1-2 seconds)
    const delay = Math.random() * 1000 + 1000;
    await new Promise((resolve) => setTimeout(resolve, delay));

    // Simulate potential empty state (10% chance)
    if (Math.random() < 0.1) {
      return {
        id: briefId,
        title: '',
        content: '',
        createdAt: new Date().toISOString(),
        citations: [],
        verificationResults: [],
      };
    }

    // Find brief with matching ID or return first brief as default
    const foundBrief = allSampleBriefs.find((b) => b.id === briefId);
    if (foundBrief) {
      return foundBrief;
    }

    // Return first brief with updated ID if not found
    return {
      ...allSampleBriefs[0],
      id: briefId,
    };
  },

  /**
   * Fetches citation details by citation ID
   * @param citationId - The ID of the citation to fetch
   * @returns Promise that resolves to CitationDetails after a simulated delay
   */
  async fetchCitationDetails(citationId: string): Promise<CitationDetails> {
    // Simulate network delay (2 - 4 seconds)
    const delay = Math.random() * 2000 + 2000;
    await new Promise((resolve) => setTimeout(resolve, delay));

    // Find citation and result from all sample briefs
    let citation: Citation | undefined;
    let result: VerificationResult | undefined;

    for (const brief of allSampleBriefs) {
      citation = brief.citations.find((c) => c.id === citationId);
      result = brief.verificationResults.find((r) => r.citationId === citationId);
      if (citation && result) break;
    }

    if (!citation || !result) {
      throw new Error(`Citation with ID ${citationId} not found`);
    }

    return {
      citation,
      result,
    };
  },

  /**
   * Fetches all briefs
   * @returns Promise that resolves to an array of Briefs
   */
  async fetchAllBriefs(): Promise<Brief[]> {
    const delay = Math.random() * 1000 + 1000;
    await new Promise((resolve) => setTimeout(resolve, delay));
    return allSampleBriefs;
  },
};
