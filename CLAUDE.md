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

### Core Application Layers
The application follows a layered architecture with distinct separation of concerns:

1. **UI Layer**: Shadcn/UI components with Tailwind CSS theming
2. **AI Integration Layer**: Custom MCP tools + AI SDK streaming + LlamaIndex Chat UI
3. **Business Logic Layer**: ProductService and state management (Zustand)
4. **Data Layer**: Mock product data with structured types

### AI-First Architecture Pattern
- **MCP Tools Pattern**: Custom tools in `ProductMCPTools` class provide structured AI capabilities
- **AI SDK Integration**: Tools are wrapped as AI SDK tools in chat route for streaming responses
- **Tool Result Components**: Each MCP tool has corresponding React component in `src/components/tools/`
- **Dual State Management**: Zustand for app state + cookie sync for AI tool access

### Chat UI Architecture
- **Ejected Components**: LlamaIndex Chat UI components are local and customizable
- **Context Pattern**: `ChatProvider` manages chat panel state globally
- **Sheet-based UI**: Chat panel slides out from right side on desktop/mobile
- **Tool Integration**: AI responses render custom result components based on tool calls

### E-commerce State Management
- **Zustand Store**: Primary cart state with persistence middleware
- **Cookie Sync**: Cart data duplicated to cookies for AI tool access via `list_cart_items`
- **Global Context**: Chat panel state managed separately from cart state

## MCP Tools Integration

### Tool Development Pattern
When adding new AI capabilities, follow this three-layer pattern:

1. **MCP Tool Method**: Add method to `ProductMCPTools` class (`src/lib/mcp/product-tools.ts`)
2. **AI SDK Wrapper**: Create AI SDK tool in chat route (`src/app/api/chat/route.ts`) 
3. **Result Component**: Build React component in `src/components/tools/` for rendering tool results

### Existing MCP Tools
- `list_products` - Product listing with filtering (category, price, stock, featured, search)
- `get_product_details` - Detailed product information by ID
- `search_products` - Full-text search with optional limits and category filters
- `get_product_categories` - Available product categories
- `filter_by_category` - Category-based product filtering
- `get_products_in_price_range` - Price range filtering
- `get_featured_products` - Featured products display
- `check_availability` - Product stock checking
- `list_cart_items` - Cart contents (reads from cookies)
- `navigate_to_page` - Application navigation assistance
- `fill_checkout_form` - Checkout form completion

### State Synchronization Pattern
Cart data flows through two channels:
- **Zustand Store**: Primary app state with localStorage persistence
- **Cookie Mirror**: Duplicate cart data in cookies for AI tool access (see `writeCartCookie` in `use-cart.ts`)

## Development Patterns

### Adding New Components
- Use Shadcn/UI base components: `npx shadcn@latest add [component-name]`
- Follow existing component structure in `src/components/ui/`
- Import utilities from `src/lib/utils.ts` for consistent styling

### AI Tool Result Components
Located in `src/components/tools/`, these components:
- Render AI tool results in chat interface
- Follow consistent card-based layout patterns
- Use Shadcn/UI components for visual consistency
- Handle loading and error states appropriately

### Type Safety Patterns
- Product types defined in `src/lib/products/types.ts`
- Zod schemas for AI tool parameters validation
- Strict TypeScript configuration enforces type safety

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

## Commit Message Guidelines

Follow Conventional Commits v1.0.0 specification for ALL commits and PR titles.

**Format:**
```
<type>(<scope>)!: <short summary>

<body>

<footer>
```

**Requirements:**
- **type**: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`
- **scope**: Optional - `app`, `components`, `lib`, `mcp`, `ui`, `hooks`, `api`
- **!**: Add for breaking changes (or use `BREAKING CHANGE:` footer)
- **summary**: Imperative, lower-case, no trailing period
- PR titles must follow same format as commits
- Keep commits focused and logically scoped

**Examples:**
```
feat(components): add ProductCard hover interactions
fix(api): handle empty search query in chat route
refactor(lib): simplify product filtering logic
feat(app)!: migrate to Next.js app router

BREAKING CHANGE: routing structure updated; legacy pages removed
```