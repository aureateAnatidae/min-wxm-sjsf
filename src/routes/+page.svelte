<script lang="ts">
import * as defaults from "$lib/form_defaults";
import { createMeta, SvelteKitForm } from "@sjsf/sveltekit/client";
import type { ActionData, PageData } from "./$types";
const meta = createMeta<ActionData, PageData>().form;
</script>

<SvelteKitForm
    {...defaults}
    {meta}
    onSuccess={console.log}
    onFailure={console.error}
    onSubmitError={console.warn}
/>
