import React from "react";

import CKEditor from '@ckeditor/ckeditor5-react';
import { ClassicEditor } from '@ckeditor/ckeditor5-build-classic';

export function Editor () {
    return (
        <div>
            <h1>editar</h1>
            <CKEditor
            editor={ClassicEditor}
            />
        </div>
    )
}