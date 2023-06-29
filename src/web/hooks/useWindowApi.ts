export default function useWindowApi() {
  const { handle, invoke, remove } = window.api;

  return { handle, invoke, remove };
}
