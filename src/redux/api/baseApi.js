import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://104.248.15.129:5000/api"
    }),
    endpoints: () => ({})
});

export const imageUrl = "http://104.248.15.129:5000";