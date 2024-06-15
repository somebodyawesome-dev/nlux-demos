import { langChainAdapter } from "@/adapter/langchain";
import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { AiChat, ChatItem, StandardChatAdapter } from "@nlux/react";
import { Check, Menu, Moon, Sun } from "lucide-react";
import { useState } from "react";
import { openAiAdapter } from "./adapter/openai";
import { Avatar, AvatarFallback, AvatarImage } from "./components/ui/avatar";
export function App() {
  const { setTheme, theme } = useTheme();

  const [conversationIndex, setConversationIndex] = useState(0);
  const [selectedModelIndex, setSelectedModelIndex] = useState(0);
  const models: {
    modelName: string;
    icon: string;
    adapter: StandardChatAdapter;
  }[] = [
    {
      modelName: "gpt-4o",
      icon: "./openai-logo.svg",
      adapter: openAiAdapter(),
    },
    {
      modelName: "langchain",
      icon: "./langchain-logo.png",
      adapter: langChainAdapter(),
    },
  ];
  const conversation: { avatar: string; title: string; chat?: ChatItem[] }[] = [
    {
      avatar: "https://github.com/shadcn.png",
      title: "New Conversation",
    },
    {
      avatar: "https://github.com/shadcn.png",
      title: "Capital of Antartica",
      chat: [
        {
          role: "user",
          message: "What's the capital of Antartica?",
        },
        {
          role: "assistant",
          message:
            'Arrr, matey! The **capital** of _Antarctica_ be none other than `"Arrrctica"`, where ye can find a jolly crew of penguins swashbuckling on icy seas!',
        },
      ],
    },
    {
      avatar: "https://github.com/shadcn.png",
      title: "Fastest land animal",
      chat: [
        {
          role: "user",
          message: "What's the fastest land animal?",
        },
        {
          role: "assistant",
          message:
            "Yarrr! The **fastest** land animal be the mighty `cheetah`! It zooms across the savannah like a cannonball from a pirate ship!",
        },
      ],
    },
    {
      avatar: "https://github.com/shadcn.png",
      title: "Plants",
      chat: [
        {
          role: "user",
          message: "How do plants make food?",
        },
        {
          role: "assistant",
          message:
            "Ahoy! Plants be clever sailors, harnessin' the power of the sun through a process called `photosynthesis`! They be usin' sunlight, water, and carbon dioxide to cook up a feast o' sugar and oxygen!",
        },
      ],
    },
  ];
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <a href="/" className="flex items-center gap-2 font-semibold">
              <Avatar className="rounded-none">
                <AvatarImage src={"./nlux.png"} />
                <AvatarFallback>Nlux</AvatarFallback>
              </Avatar>
              <span className="">Nlux</span>
            </a>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium gap-1 lg:px-4">
              {conversation.map((val, index) => (
                <a
                  className={`${
                    index === conversationIndex
                      ? "!bg-secondary"
                      : "bg-transparent"
                  } flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary cursor-pointer hover:bg-secondary `}
                  onClick={() => setConversationIndex(index)}
                >
                  <Avatar className="rounded-xl">
                    <AvatarImage src={val.avatar} />
                    <AvatarFallback>
                      {val.title
                        .split(" ")
                        .slice(0, 2)
                        .reduce((a, b) => a + b[0], "")}
                    </AvatarFallback>
                  </Avatar>
                  {val.title}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium pt-2">
                {conversation.map((val) => (
                  <a
                    href="#"
                    className={` flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary cursor-pointer hover:bg-secondary `}
                  >
                    <Avatar className="rounded-none">
                      <AvatarImage src={val.avatar} />
                      <AvatarFallback>
                        {val.title
                          .split(" ")
                          .slice(0, 2)
                          .reduce((a, b) => a + b[0], "")}
                      </AvatarFallback>
                    </Avatar>
                    {val.title}
                  </a>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
            <form>
              <div className="relative flex">
                <DropdownMenu>
                  <DropdownMenuTrigger id="model" className="items-start ">
                    <Button variant="outline">Model</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    {models.map((val, index) => (
                      <DropdownMenuItem
                        className="z-[999989]"
                        onClick={() => setSelectedModelIndex(index)}
                      >
                        <div className="flex items-center gap-3 text-muted-foreground cursor-pointer z-auto">
                          <img
                            src={val.icon}
                            className="w-6 h-6 object-scale-down"
                          />
                          <div className="grid gap-0.5">
                            <span className="flex gap-1 items-center">
                              <p className=" font-medium text-foreground">
                                {val.modelName}
                              </p>
                              {index === selectedModelIndex && <Check />}
                            </span>
                            <p className="text-xs" data-description>
                              OpenAI fastest model for general use cases.
                            </p>
                          </div>
                        </div>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </form>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  console.log("wiow");

                  setTheme("dark");
                }}
              >
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("auto")}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>{" "}
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <AiChat
            adapter={models[selectedModelIndex].adapter}
            composerOptions={{
              placeholder: "How can I help you today?",
            }}
            initialConversation={conversation[conversationIndex].chat}
            displayOptions={{
              width: "100%",
              height: "100%",
              themeId: "nova",
              colorScheme: theme,
            }}
            personaOptions={{
              assistant: {
                name: "HarryBotter",
                avatar:
                  "https://docs.nlkit.com/nlux/images/personas/harry-botter.png",
                tagline: "Mischievously Making Magic With Mirthful AI!",
              },
              user: {
                name: "Alex",
                avatar: "https://docs.nlkit.com/nlux/images/personas/alex.png",
              },
            }}
          />
        </main>
      </div>
    </div>
  );
}

export default App;
