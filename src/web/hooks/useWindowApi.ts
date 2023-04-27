/**
 *
 * THIN WRAPPER AROUND THE window.api
 * TO NOT HAVE const {handle,invoke,remove}=window.api
 * SCATTERED ABOUT
 *
 * THIS IS A UTILITY AND WILL HARDLY CHANGE
 *
 */
export default function useWindowApi() {
  const { handle, invoke, remove } = window.api;

  return { handle, invoke, remove };
}
