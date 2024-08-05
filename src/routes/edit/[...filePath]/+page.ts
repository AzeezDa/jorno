import type { PageLoad } from './$types';
import { open_jorno } from "../../../lib/Jorno"
import { error } from '@sveltejs/kit';

export const load: PageLoad = async ({ params }) => {
     let jorno = await open_jorno(params.filePath);

     if (jorno) {
          return jorno;
     } else {
          // TODO: Redirect to better error page
          error(404);
     }
}
