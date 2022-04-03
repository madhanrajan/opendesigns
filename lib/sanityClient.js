import sanityClient from "@sanity/client"

export const client = sanityClient(
    {
        projectId: "zyqdqeeq",
        dataset: "production",
        apiVersion: "2021-03-25",
        useCdn: false,
        token: "skZXEx0pWEgudP2dgtJA7uqTNgoBeRpnW1K8W9z4Xl60JfE2zyM9A0RacYixo9jzlGK3yZb3shgt1hjbznCInJmR9zwBhVvQWmB7BdRw4GLfgGvXX7GZA6GXqFtDnjTfD14kulnUBCYxPf5eCGemCrmGTZLOPQfR9yaeeR8DRsns3EsqDVBq"
    }
);