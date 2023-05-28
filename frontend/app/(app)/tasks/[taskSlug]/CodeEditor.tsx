import AceEditor from 'react-ace';

import 'ace-builds/src-noconflict/ace';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-xcode';
import 'ace-builds/src-noconflict/ext-language_tools';

interface Props {
  language: string;
  code: string;
  setCode: (newCode: string) => void;
  readOnly: boolean;
}

export default function CodeEditor({
  language, code, setCode, readOnly,
}: Props) {
  // Calculate the editor's height
  const lineHeight = 16; // Line height in pixels - adjust as needed
  const padding = 20; // Adjust as needed
  const numberOfLines = code.split('\n').length;
  const editorHeight = `${numberOfLines * lineHeight + padding}px`;

  return (
    <AceEditor
      mode={language}
      theme="xcode"
      value={code}
      onChange={(newCode) => setCode(newCode)}
      name="code_editor"
      editorProps={{ $blockScrolling: true }}
      readOnly={readOnly}
      height={editorHeight}
      setOptions={{
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        enableSnippets: true,
        maxLines: Infinity,
      }}
    />
  );
}
