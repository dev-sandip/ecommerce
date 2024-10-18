
// import { client } from "@/lib/rpc";
// import { useMutation } from "@tanstack/react-query";
// import { InferRequestType, InferResponseType } from "hono";

// type ResponseType = InferResponseType<typeof client.auth.login["$post"]>
// type RequestType = InferRequestType<typeof client.auth.login["$post"]>

// export const useLogin = () => {
//     const mutation = useMutation<ResponseType, Error, RequestType>({
//         mutationFn: async (json) => {
//             const response = await client.auth.login["$post"](json);
//             return response.json();
//         },
//     });
//     return mutation;
// }