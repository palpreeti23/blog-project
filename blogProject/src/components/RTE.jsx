import React from "react";
import { Controller } from "react-hook-form";
import { Editor } from "@tinymce/tinymce-react";

function RTE({ name, control, defaultValue = "" }) {
  return (
    <div>
      <Controller
        name={name || "content"}
        control={control}
        render={({ field: onChange }) => (
          <Editor
            apiKey=""
            initialValue={defaultValue}
            init={{
              initialValue: defaultValue,
              menubar: true,
              height: 400,
              plugins: [
                "advlist autolink lists link image charmap code codesample",
                "emoticons fullscreen help searchreplace visualblocks visualchars",
                "nonbreaking insertdatetime autoresize autosave paste wordcount",
              ],
              toolbar:
                "undo redo | bold italic underline | \
       alignleft aligncenter alignright alignjustify | \
       bullist numlist | link image media | \
       codesample emoticons | searchreplace | fullscreen | help",
              content_style: "body { font-family:Helvetica,Arial,sans-serif }",
            }}
            onEditorChange={onChange}
          />
        )}
      />
    </div>
  );
}

export default RTE;
