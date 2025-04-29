import { isErrorResponse } from "@ts-rest/core";
import { toast } from "sonner";

const DEFAULT_ERROR_MESSAGE = "An error occured. Please try again.";

export function handleApiError(error: unknown) {
  if (isErrorResponse(error)) {
    if (error.status !== 422) {
      toast("Error", {
        description: error.body?.message ?? DEFAULT_ERROR_MESSAGE,
      });
    }
  } else {
    toast("Error", {
      description: "An error occured. Please reload the page.",
    });
  }
}
