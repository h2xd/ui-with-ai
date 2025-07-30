# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js TypeScript project with AI chat capabilities powered by LlamaIndex and Anthropic Claude. It features a complete chat UI built with Shadcn/UI components and LlamaIndex Chat UI.

## Key Dependencies

- **Next.js 15**: React framework with App Router
- **LlamaIndex**: AI workflow framework (`llamaindex`, `@llamaindex/workflow`, `@llamaindex/anthropic`, `@llamaindex/chat-ui`)
- **Anthropic**: Claude AI integration
- **Zod**: Schema validation and type safety
- **Shadcn/UI**: UI component library with Tailwind CSS
- **AI SDK**: Vercel AI SDK for chat streaming

## Development Commands

- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

## Environment Setup

1. Copy `.env.example` to `.env.local`
2. Add your Anthropic API key:
   ```
   ANTHROPIC_API_KEY=sk-ant-api03-your-key-here
   ```

## Project Structure

- `src/app/` - Next.js App Router pages and API routes
- `src/app/api/chat/route.ts` - Chat API endpoint using LlamaIndex + Anthropic
- `src/components/chat.tsx` - LlamaIndex Chat UI components (ejected)
- `src/lib/utils.ts` - Utility functions
- `components.json` - Shadcn/UI configuration

## Architecture Notes

The application combines:
- **Next.js App Router** for full-stack React development
- **LlamaIndex Chat Engine** for AI conversation management
- **Anthropic Claude** as the LLM provider
- **Streaming responses** via AI SDK for real-time chat
- **Shadcn/UI components** for polished interface

The chat UI components have been "ejected" from the LlamaIndex registry, meaning they're now local components that can be customized as needed.

## Shell Tooling

**File Operations:**
- `fd` - Fast file/directory finder (better than `find`)
  - `fd "*.ts" src/` - Find TypeScript files in src/
  - `fd -t f "component"` - Find files containing "component"

**Text Search:**
- `rg` - Ripgrep for fast text/pattern search  
  - `rg "export.*function" --type ts` - Find function exports in TS files
  - `rg -i "todo|fixme"` - Case-insensitive search for comments

**Code Analysis:**
- `ast-grep` - Structural code search and refactoring
  - `ast-grep --lang ts --pattern 'function $NAME() { $$$ }'` - Find function patterns
  - `sg -p 'import { $$ } from "$MOD"'` - Find import statements

**Interactive Selection:**
- `fzf` - Fuzzy finder for filtering results
  - `fd . | fzf` - Interactive file picker
  - `rg --files | fzf --preview 'bat {}'` - File picker with preview

**Data Processing:**
- `jq` - JSON processor and formatter
  - `cat package.json | jq '.dependencies'` - Extract dependencies
  - `jq -r '.scripts | keys[]' package.json` - List npm scripts

- `yq` - YAML/XML processor  
  - `yq '.workflow.jobs' .github/workflows/ci.yml` - Parse YAML configs

**Quick Search Patterns for Claude Code:**
```bash
# Find all TypeScript/JavaScript files
fd -e ts -e js -e tsx -e jsx

# Find specific patterns in code
rg "export (default|const|function|class)" --type ts
rg "import.*from" --type ts
rg "interface|type.*=" --type ts
rg "TODO|FIXME|XXX|HACK" -i

# Find React/UI components
rg "React\.|useState|useEffect" --type tsx
ast-grep --lang tsx --pattern 'function $_($$$) { return $$$ }'

# Find configuration files
fd "package\.json|tsconfig|\.env|docker"

# Interactive exploration
fd . src/ | fzf --preview 'bat --color=always {}'
rg --files | fzf --preview 'rg --color=always --line-number "{q}" {}'

# Package.json analysis
jq '.scripts, .dependencies, .devDependencies' package.json
```