import React, { useEffect, useState } from "react";
import { INIT_CODE } from "../utils/constants";
import { useDebouncedCallback } from "use-debounce";
import styles from "../../styles/Home.module.css";
import AceEditor from "react-ace";
// @ts-ignore
import lebab from "lebab";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-dracula";
import "ace-builds/src-noconflict/ext-language_tools";

import type { IAceEditorProps } from "react-ace/src/ace";

interface ITranspiled {
  code: string;
  warnings: { line: number; msg: string; type: string }[];
}
const options = {
  useWorker: false,
  printMargin: false,
};
const style = {
  height: "100%",
  minHeight: "85vh",
  minWidth: "47vw",
  padding: 5,
};
const BaseEditor = (props: IAceEditorProps) => {
  return (
    <AceEditor
      mode="javascript"
      theme="dracula"
      key={"editor"}
      name={"editor"}
      fontSize={14}
      tabSize={2}
      highlightActiveLine={false}
      wrapEnabled={false}
      style={style}
      setOptions={options}
      {...props}
    />
  );
};
const CodeEditor = () => {
  const [code, setCode] = useState(INIT_CODE);
  const [transpiled, setTranspiled] = useState<ITranspiled>({ code: "", warnings: [] });
  const debouncedOnChange = useDebouncedCallback(
    // function
    (value) => {
      setCode(value);
    },
    // delay in ms
    1000,
  );
  useEffect(() => {
    setTranspiled(() => {
      const newCode = lebab.transform(code, [
        "arg-rest",
        "arg-spread",
        "arrow",
        "arrow-return",
        "class",
        "commonjs",
        "default-param",
        "destruct-param",
        "exponent",
        "for-each",
        "for-of",
        "includes",
        "let",
        "multi-var",
        "no-strict",
        "obj-method",
        "obj-shorthand",
        "template",
      ]);
      return newCode;
    });
  }, [code]);

  return (
    <>
      <div className={styles.grid}>
        <div className={styles.editor}>
          <BaseEditor onChange={debouncedOnChange} value={code} />
        </div>
        <div className={styles.editor}>
          <BaseEditor value={transpiled.code} readOnly />
        </div>
      </div>
      <div
        style={{
          marginBottom: 10,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {transpiled.warnings.length > 0 && <h2>Warnings</h2>}
        {transpiled.warnings.map((warning) => (
          <div key={warning.line}>
            <span style={{ paddingRight: 5 }}>
              Line {warning.line}, {warning.type}:
            </span>
            <span>{warning.msg}</span>
          </div>
        ))}
      </div>
    </>
  );
};
export default CodeEditor;
