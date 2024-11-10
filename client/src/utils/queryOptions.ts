import { queryOptions, useMutation } from "@tanstack/react-query";
import {
  fetchAuctions, // fetchInvoiceById,
} from "./auctions";

import { queryClient } from "../main";

export const auctionsQueryOptions = queryOptions({
  queryKey: ["auctions"],
  queryFn: () => fetchAuctions(),
});
//
// export const invoiceQueryOptions = (invoiceId: number) =>
//   queryOptions({
//     queryKey: ["invoices", invoiceId],
//     queryFn: () => fetchInvoiceById(invoiceId),
//   });
//
// export const usersQueryOptions = (opts: {
//   filterBy?: string;
//   sortBy?: "name" | "id" | "email";
// }) =>
//   queryOptions({
//     queryKey: ["users", opts],
//     queryFn: () => fetchUsers(opts),
//   });
//
// export const userQueryOptions = (userId: number) =>
//   queryOptions({
//     queryKey: ["users", userId],
//     queryFn: () => fetchUserById(userId),
//   });
//
// export const useCreateInvoiceMutation = () => {
//   return useMutation({
//     // mutationKey: ['invoices', 'create'],
//     mutationFn: postInvoice,
//     onSuccess: () => queryClient.invalidateQueries(),
//   });
// };
//
// export const useUpdateInvoiceMutation = (invoiceId: number) => {
//   return useMutation({
//     mutationKey: ["invoices", "update", invoiceId],
//     mutationFn: patchInvoice,
//     onSuccess: () => queryClient.invalidateQueries(),
//     gcTime: 1000 * 10,
//   });
// };
