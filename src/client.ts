import {createClient} from "@sanity/client";

export const client = createClient({
    projectId: "oWSViEe6N",
    perspective: "published",
    dataset: "production"
})