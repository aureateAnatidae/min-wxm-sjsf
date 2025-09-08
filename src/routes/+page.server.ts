import { createFormValidator } from "@sjsf/ajv8-validator";
import type { UiSchemaRoot, Schema } from "@sjsf/form";
import type { Actions, PageServerLoad } from "./$types";

// Remove with version 2.4.0 of @sjsf/sveltekit
declare module "@sjsf/sveltekit" {
  interface InitialFormData<T, E, SendSchema extends boolean> {
    uiSchema?: UiSchemaRoot;
  }
}

import { initForm, makeFormDataParser, validateForm } from "@sjsf/sveltekit/server";

const validator = createFormValidator();
const parseFormData = makeFormDataParser({ validator });

const schema: Schema = {
  "type": "object",
  "properties": {
    "Upload your favourite cute animal photo": {
      "type": "string",
      "format": "data-url",
      "title": "Upload your favourite cute animal photo"
    }
  },
  "required": ["Upload your favourite cute animal photo"],
  "title": "Test form ABC"
}
const uiSchema: UiSchemaRoot = {
  "Upload your favourite cute animal photo": {
    "ui:components": {
      "stringField": "fileField"
    }
  }
}

export const load: PageServerLoad = async (event) => {
  const form = initForm({
    schema,
    uiSchema,
    sendSchema: true,
  });
  return {
    form,
  };
};

export const actions: Actions = {
  default: async ({request}) => {
    const data = await parseFormData({
      request,
      schema,
    });
    return {
      form: await validateForm({
        request,
        schema,
        validator,
        data,
      }),
    };
  },
};
