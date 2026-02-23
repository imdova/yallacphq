"use client";

import * as React from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Play,
  Bookmark,
  ArrowRight,
  Star,
  FolderOpen,
  Bot,
  Send,
  FileText,
  FileSpreadsheet,
  FileCode,
} from "lucide-react";

const takeaways = [
  "The 80/20 Rule: Focus on the \"Vital Few\" (20%) of causes that contribute to 80% of the effects/problems.",
  "Visualization: Bars are arranged in descending order from left to right, paired with a cumulative line graph.",
  "Clinical Application: Prioritizing readmission causes or surgical complications in a hospital setting.",
];

const resources = [
  { name: "Pareto_Worksheet.pdf", size: "4.2 MB", label: "Interactive PDF", icon: FileText },
  { name: "Quality_Tools_List.xlsx", size: "1.8 MB", label: "Template", icon: FileSpreadsheet },
  { name: "Study_Notes_M2.txt", size: "12 KB", label: "Text File", icon: FileCode },
];

export function LessonContentView() {
  const [aiQuery, setAiQuery] = React.useState("");

  return (
    <div className="flex-1 min-w-0 space-y-6">
      {/* Video player */}
      <div className="aspect-video w-full overflow-hidden rounded-xl bg-black">
        <div className="flex h-full w-full items-center justify-center">
          <button
            type="button"
            className="flex h-20 w-20 items-center justify-center rounded-full bg-gold/90 text-gold-foreground hover:bg-gold transition-colors"
            aria-label="Play"
          >
            <Play className="h-10 w-10 fill-current pl-1" />
          </button>
        </div>
        <div className="mt-1 flex items-center gap-2 px-2 pb-2">
          <div className="h-1 flex-1 overflow-hidden rounded-full bg-zinc-700">
            <div className="h-full w-[51%] rounded-full bg-gold" />
          </div>
          <span className="text-xs text-zinc-400">14:22 / 28:05</span>
        </div>
      </div>

      {/* Title + actions */}
      <div>
        <h1 className="text-xl font-bold text-zinc-900 md:text-2xl">
          2.4 Pareto Chart Analysis & Application
        </h1>
        <p className="mt-1 text-sm text-zinc-500">
          Topic: Healthcare Quality Identification Tools
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Button variant="outline" size="sm" className="gap-2 border-zinc-300">
            <Bookmark className="h-4 w-4" />
            Save
          </Button>
          <Button asChild className="gap-2 bg-gold text-gold-foreground hover:bg-gold/90">
            <Link href="#">Next Lesson<ArrowRight className="h-4 w-4" /></Link>
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="takeaways" className="w-full">
        <TabsList className="h-auto gap-0 rounded-none border-b border-zinc-200 bg-transparent p-0">
          <TabsTrigger
            value="takeaways"
            className="rounded-none border-b-2 border-gold bg-transparent px-4 py-2 text-gold data-[state=inactive]:border-transparent data-[state=inactive]:text-zinc-600 data-[state=inactive]:hover:text-zinc-900"
          >
            <Star className="mr-2 h-4 w-4" />
            Key Takeaways
          </TabsTrigger>
          <TabsTrigger
            value="resources"
            className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=inactive]:text-zinc-600 data-[state=inactive]:hover:text-zinc-900"
          >
            <FolderOpen className="mr-2 h-4 w-4" />
            Resources
          </TabsTrigger>
          <TabsTrigger
            value="ai"
            className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=inactive]:text-zinc-600 data-[state=inactive]:hover:text-zinc-900"
          >
            <Bot className="mr-2 h-4 w-4" />
            AI Tutor
          </TabsTrigger>
        </TabsList>
        <TabsContent value="takeaways" className="mt-6">
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-500">
                AI-Generated Summary
              </h3>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-zinc-700">
                {takeaways.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
            <Card className="border-zinc-200">
              <CardContent className="p-4">
                <h3 className="font-semibold text-zinc-900">Ask AI Tutor</h3>
                <p className="mt-1 text-sm text-zinc-500">Ask anything about Pareto Charts</p>
                <div className="mt-3 flex gap-2">
                  <Input
                    type="text"
                    placeholder="Explain the cumulative percentage calculation..."
                    value={aiQuery}
                    onChange={(e) => setAiQuery(e.target.value)}
                    className="flex-1 rounded-lg border-zinc-200"
                  />
                  <Button size="icon" className="shrink-0 bg-gold text-gold-foreground hover:bg-gold/90">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Button variant="outline" size="sm" className="rounded-full border-zinc-200 text-xs">
                    What is the 80/20 rule?
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-full border-zinc-200 text-xs">
                    Show CPHQ Exam Question
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="resources" className="mt-6">
          <p className="text-sm text-zinc-600">Downloadable files for this lesson.</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {resources.map((r) => (
              <Card key={r.name} className="border-zinc-200">
                <CardContent className="flex items-center gap-3 p-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-zinc-100 text-zinc-600">
                    <r.icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-zinc-900">{r.name}</p>
                    <p className="text-xs text-zinc-500">{r.size} · {r.label}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="ai" className="mt-6">
          <Card className="border-zinc-200">
            <CardContent className="p-4">
              <h3 className="font-semibold text-zinc-900">Ask AI Tutor</h3>
              <p className="mt-1 text-sm text-zinc-500">Ask anything about Pareto Charts</p>
              <div className="mt-3 flex gap-2">
                <Input
                  type="text"
                  placeholder="Explain the cumulative percentage calculation..."
                  value={aiQuery}
                  onChange={(e) => setAiQuery(e.target.value)}
                  className="flex-1 rounded-lg border-zinc-200"
                />
                <Button size="icon" className="shrink-0 bg-gold text-gold-foreground hover:bg-gold/90">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <Button variant="outline" size="sm" className="rounded-full border-zinc-200 text-xs">
                  What is the 80/20 rule?
                </Button>
                <Button variant="outline" size="sm" className="rounded-full border-zinc-200 text-xs">
                  Show CPHQ Exam Question
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Downloadable files (below tabs in Key Takeaways view) */}
      <div className="border-t border-zinc-200 pt-6">
        <h3 className="text-sm font-semibold text-zinc-900">Downloadable Files</h3>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          {resources.map((r) => (
            <Card key={r.name} className="border-zinc-200">
              <CardContent className="flex items-center gap-3 p-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-zinc-100 text-zinc-600">
                  <r.icon className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-zinc-900">{r.name}</p>
                  <p className="text-xs text-zinc-500">{r.size} · {r.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
