export interface TopBar {
  title?: string,
  buttons?: TopBarButtonItems
}

export interface ButtonItem {
  title: string,
  action: any;
}

export interface TopBarButtonItems extends Array<ButtonItem>{}
