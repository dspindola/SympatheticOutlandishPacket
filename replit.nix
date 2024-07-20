{ pkgs }: {
  deps = [
    pkgs.cowsay
    pkgs.nodejs_22
    pkgs.vscode-langservers-extracted
    pkgs.zls
    pkgs.zig
  ];
}