import React from "react";
import { Controller } from "react-hook-form";
import { Editor } from "@tinymce/tinymce-react";

function RTE({ name, label, control }) {
  return (
    <div>
      {label && (
        <label className={`text-gray-800 text-left px-2 mt-2`}>{label}</label>
      )}
      <Controller
        name={name || "content"}
        control={control}
        render={({ field: { value, onChange } }) => (
          <Editor
            apiKey="2xnm8r8h1xqceuzzcifleksvhm15m396bjb80nb9m8rxseft"
            // initialValue={value}
            value={value}
            init={{
              // initialValue: defaultValue,
              menubar: true,
              height: 400,
              plugins: [
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "help",
                "wordcount",
              ],
              toolbar:
                "undo redo | bold italic underline | \
       alignleft aligncenter alignright alignjustify | \
       bullist numlist | link image media | \
       codesample emoticons | searchreplace | fullscreen | help",
              content_style: "body { font-family:Helvetica,Arial,sans-serif }",
            }}
            onEditorChange={(content) => {
              // console.log("EDITOR CONTENT:", content);
              onChange(content);
            }}
          />
        )}
      />
    </div>
  );
}

export default RTE;
