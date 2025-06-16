import {createClient} from "@sanity/client";

export const client = createClient({
    projectId: "jlt7jbaf",
    perspective: "published",
    dataset: "production",
    useCdn: true,
    apiVersion: "2025-06-16",
})