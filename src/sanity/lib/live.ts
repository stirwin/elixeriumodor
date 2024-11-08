import "server-only"

import { client } from "./client"
import { defineLive } from "next-sanity";

const token = process.env.SANITY_API_READ_TOKEN;
if (!token) {
    throw new Error("SANITY_API_READ_TOKEN is not set")
}

export const {sanityFetch, SanityLive} = defineLive({
    client,
    serverToken: token,
    browserToken: token,
    fetchOptions: {
        revalidate: 0,
    },
});