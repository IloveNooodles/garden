import { i18n } from "../i18n"
import { classNames } from "../util/lang"
import { pathToRoot } from "../util/path"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

const PageTitle: QuartzComponent = ({ fileData, cfg, displayClass }: QuartzComponentProps) => {
  const title = cfg?.pageTitle ?? i18n(cfg.locale).propertyDefaults.title
  const baseDir = pathToRoot(fileData.slug!)
  
  return (
    <h2 class={classNames(displayClass, "page-title")}>
      <a href={baseDir} title={title}>
        <pre class="title-ascii">
          <span class="tree-foliage">{`          ***********
        ****************
      *******************
      ********************
       ********************
          \\   //  ********
           \\\\//  *******`}</span>
          <span class="tree-trunk">{`
             \\\\\\////
              |||//                       ,
              |||||                    __/
  ,,,,,,,,,,,//||||\\,,,,,,,,,,,,,,,,,,o==o
  ;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;`}</span>
        </pre>
      </a>
    </h2>
  )
}

PageTitle.css = `
.page-title {
  font-size: 8px;
  margin: 0;
}

.page-title a {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.page-title a:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.tree-foliage {
  color: #2d7a2d;
}

.tree-trunk {
  color: #8b4513;
}

.title-icon {
  font-size: 1.5rem;
  color: white;
  font-weight: bold;
}
`

export default (() => PageTitle) satisfies QuartzComponentConstructor
