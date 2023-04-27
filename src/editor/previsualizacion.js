import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import remarkGfm from "remark-gfm";


export function Previsualizacion(props) {

  const { preview } = props;

  return (
    <>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {preview}
      </ReactMarkdown>
    </>
  )
}