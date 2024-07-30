import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
    baseUrl: '/api',
    prepareHeaders: (headers) => {
        headers.set('Authorization', 'Bearer VlP9cwH6cc7Kg2LsNPXpAvF6QNmgZn');
        return headers;
    },
});

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery,
    endpoints: (builder) => ({
        getContacts: builder.query({
        query: () => ({
            url: 'contacts',
            params: { sort: 'created:desc' },
        }),
        }),
        createContact: builder.mutation({
        query: (newContact) => ({
            url: 'contact',
            method: 'POST',
            body: newContact,
        }),
        }),
        deleteContact: builder.mutation({
        query: (id) => ({
            url: `contact/${id}`,
            method: 'DELETE',
        }),
        }),
        getContactById: builder.query({
        query: (id) => `contact/${id}`,
        }),
        addTagsToContact: builder.mutation({
        query: ({ id, tags }) => ({
            url: `contact/${id}/tags`,
            method: 'PUT',
            body: tags,
        }),
        }),
    }),
});

export const {
    useGetContactsQuery,
    useCreateContactMutation,
    useDeleteContactMutation,
    useGetContactByIdQuery,
    useAddTagsToContactMutation,
} = apiSlice;