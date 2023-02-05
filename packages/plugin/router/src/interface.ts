export interface RouterPluginProps {
  /**处理图标菜单中图标引入问题*/
  analysisRoutersIcon?: (icons: { name: string; newName: string }[]) => string;
  /**在src目录下生成的临时文件夹名称*/
  temp?: string;
}
