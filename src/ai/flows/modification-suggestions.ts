'use server';
/**
 * @fileOverview AI-powered modification suggestions flow.
 *
 * - getModificationSuggestions - A function that returns modification suggestions based on user input and popular preferences.
 * - ModificationSuggestionsInput - The input type for the getModificationSuggestions function.
 * - ModificationSuggestionsOutput - The return type for the getModificationSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ModificationSuggestionsInputSchema = z.object({
  carModel: z.string().describe('The model of the car being customized.'),
  selectedParts: z.array(z.string()).describe('The currently selected car parts.'),
});
export type ModificationSuggestionsInput = z.infer<typeof ModificationSuggestionsInputSchema>;

const ModificationSuggestionsOutputSchema = z.object({
  suggestions: z.array(z.string()).describe('AI-powered modification suggestions based on popular preferences.'),
});
export type ModificationSuggestionsOutput = z.infer<typeof ModificationSuggestionsOutputSchema>;

export async function getModificationSuggestions(input: ModificationSuggestionsInput): Promise<ModificationSuggestionsOutput> {
  return modificationSuggestionsFlow(input);
}

const modificationSuggestionsPrompt = ai.definePrompt({
  name: 'modificationSuggestionsPrompt',
  input: {schema: ModificationSuggestionsInputSchema},
  output: {schema: ModificationSuggestionsOutputSchema},
  prompt: `You are an expert car modification advisor. Based on the car model and currently selected parts, suggest other relevant modifications that are popular among car enthusiasts.

Car Model: {{{carModel}}}
Selected Parts: {{#each selectedParts}}{{{this}}}, {{/each}}

Suggest relevant modifications:`,
});

const modificationSuggestionsFlow = ai.defineFlow(
  {
    name: 'modificationSuggestionsFlow',
    inputSchema: ModificationSuggestionsInputSchema,
    outputSchema: ModificationSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await modificationSuggestionsPrompt(input);
    return output!;
  }
);
