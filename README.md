# UI with AI - Research Project

A research project focused on introducing AI into UI products, demonstrated through LeekShop - an AI-enhanced e-commerce platform that showcases intelligent shopping experiences and AI-UI integration patterns.

## 🎯 Project Overview

This project explores how AI can be seamlessly integrated into user interfaces to create more intelligent, helpful, and engaging product experiences. LeekShop serves as a demonstration platform featuring:

- **AI Shopping Assistant**: LeekBot provides intelligent product recommendations and support
- **Natural Language Interaction**: Conversational AI for product discovery and checkout assistance
- **Context-Aware Tools**: Custom MCP (Model Context Protocol) tools for enhanced AI capabilities
- **Modern UI Patterns**: Showcasing AI integration with contemporary design systems

## 🛠 Technology Stack

- **Framework**: Next.js 15 with App Router and TypeScript
- **AI Integration**: Anthropic Claude 3.5 Sonnet via AI SDK
- **AI Workflow**: LlamaIndex for chat UI and workflow management
- **UI Library**: Shadcn/UI components with Tailwind CSS
- **State Management**: Zustand for cart and application state
- **Package Manager**: pnpm 8.6.7

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- pnpm package manager
- Anthropic API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ui-with-ai
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Environment setup**
   ```bash
   cp .env.example .env.local
   ```
   Add your Anthropic API key to `.env.local`:
   ```env
   ANTHROPIC_API_KEY=sk-ant-api03-your-api-key-here
   ```

4. **Start development server**
   ```bash
   pnpm dev
   ```

5. **Open the application**
   Visit [http://localhost:3000](http://localhost:3000) to explore the AI-enhanced interface

## 🤖 Agent, Tools & LLM Configuration

### AI Agent
- **LeekBot**: Intelligent shopping assistant with personality
- **Configuration**: System prompt in `src/app/api/chat/route.ts:243-290`
- **Capabilities**: Product recommendations, navigation assistance, checkout support

### LLM Setup
- **Model**: Claude 3.5 Sonnet (`claude-3-5-sonnet-20241022`)
- **Configuration**: Chat API route at `src/app/api/chat/route.ts:242`
- **Streaming**: Real-time responses via AI SDK

### Custom Tools (MCP Integration)
Located in `src/lib/mcp/product-tools.ts`:

- `list_products` - Product listing with advanced filtering
- `get_product_details` - Detailed product information
- `search_products` - Full-text product search
- `get_product_categories` - Category management
- `filter_by_category` - Category-based filtering
- `get_products_in_price_range` - Price range filtering
- `get_featured_products` - Featured products display
- `check_availability` - Stock availability checking
- `list_cart_items` - Cart contents management
- `navigate_to_page` - Application navigation
- `fill_checkout_form` - Checkout assistance

## 📁 Project Structure

```
src/
├── app/                     # Next.js App Router
│   ├── api/chat/           # AI chat endpoint
│   ├── shop/               # Product pages
│   └── cart/checkout/      # E-commerce flow
├── components/
│   ├── chat.tsx            # LlamaIndex Chat UI (ejected)
│   ├── tools/              # AI tool result components
│   └── ui/                 # Shadcn/UI components
├── lib/
│   ├── mcp/                # Model Context Protocol tools
│   └── products/           # Product data and services
└── contexts/               # React context providers
```

### Key Configuration Files
- `components.json` - Shadcn/UI configuration
- `tailwind.config.ts` - Styling configuration  
- `tsconfig.json` - TypeScript configuration
- `CLAUDE.md` - AI assistant instructions
- `prd.md` - Product requirements document

## 🔧 Development Commands

```bash
pnpm dev          # Start development server with Turbopack
pnpm build        # Build for production
pnpm start        # Start production server  
pnpm lint         # Run ESLint
```

## 🧪 Exploring AI-UI Patterns

This project demonstrates several AI-UI integration patterns:

1. **Conversational Commerce**: Natural language product discovery
2. **Contextual Assistance**: AI that understands shopping context
3. **Tool Integration**: Custom tools that extend AI capabilities
4. **Progressive Enhancement**: AI features that enhance but don't replace core functionality
5. **Streaming Interactions**: Real-time AI responses for better UX

## 📋 Extending the Project Further

### Product Requirements Document
See `prd.md` for:
- Detailed feature roadmap and technical specifications
- Current implementation status and future enhancements
- Business requirements and success metrics
- Technical architecture decisions and patterns

### AI-Powered Development Integration

**Claude Code Integration**:
- This project is optimized for Claude Code development
- Use `CLAUDE.md` for project-specific AI assistant instructions
- Leverage shell tooling patterns documented in `CLAUDE.md`

**Cursor Integration**:
- Configure Cursor with the project's TypeScript and AI SDK setup
- Use the existing component patterns for AI-enhanced features
- Reference the MCP tools structure for extending AI capabilities

### Enhancement Guidelines

**Adding New MCP Tools**:
1. Extend `ProductMCPTools` class in `src/lib/mcp/product-tools.ts`
2. Create AI SDK tool wrapper in `src/app/api/chat/route.ts`
3. Add result components in `src/components/tools/`

**Integrating Additional AI Services**:
1. Configure new providers in the chat API route
2. Extend the system prompt for new capabilities
3. Create context-aware tool integrations

**UI Pattern Extensions**:
1. Study existing Shadcn/UI component usage
2. Follow the established TypeScript patterns
3. Implement responsive design with Tailwind CSS

### Research Applications

This codebase serves as a foundation for exploring:

- **Conversational UI Patterns**: How AI can replace traditional form interfaces
- **Context-Aware Computing**: AI that understands application state
- **Tool-Augmented AI**: Extending LLM capabilities with custom functions
- **Progressive AI Enhancement**: Adding intelligence without disrupting core workflows
- **Multi-Modal Interactions**: Combining text, images, and structured data

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [LlamaIndex.ts Documentation](https://ts.llamaindex.ai/)
- [Anthropic API Documentation](https://docs.anthropic.com/)
- [Shadcn/UI Components](https://ui.shadcn.com/)
- [AI SDK Documentation](https://sdk.vercel.ai/)

## 🤝 Contributing

This research project welcomes contributions that advance AI-UI integration patterns. Please refer to `prd.md` for current development priorities and technical requirements.

---

*Built with ❤️ to explore the future of AI-enhanced user interfaces*