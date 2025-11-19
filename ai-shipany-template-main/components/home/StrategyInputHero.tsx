import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import HeroBg from "@/components/blocks/hero/bg";
import { ArrowRight, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import SmartSuggestions from "@/components/guide/SmartSuggestions";

interface StrategyInputHeroProps {
    onGenerate: (input: string) => void;
    isGenerating: boolean;
}

export default function StrategyInputHero({ onGenerate, isGenerating }: StrategyInputHeroProps) {
    const [input, setInput] = useState("");
    const t = useTranslations("strategy_input");

    const handleSelectSuggestion = (text: string) => {
        setInput(text);
    };

    return (
        <section className="relative py-24 overflow-hidden">
            <HeroBg />
            <div className="container relative z-10">
                <div className="mx-auto max-w-3xl text-center">
                    <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm mb-6 bg-background/50 backdrop-blur-sm">
                        <span className="flex h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                        {t("active_badge")}
                    </div>

                    <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-6xl bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                        {t("title_prefix")} <span className="text-primary">{t("title_highlight")}</span>
                    </h1>

                    <p className="mb-10 text-lg text-muted-foreground">
                        {t("description")}
                    </p>

                    <div className="bg-card/50 backdrop-blur-md border rounded-2xl p-2 shadow-2xl" data-tour="strategy-input">
                        <div className="relative">
                            <Textarea
                                placeholder={t("placeholder")}
                                className="min-h-[120px] resize-none border-0 bg-transparent text-lg focus-visible:ring-0 p-4"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                            />
                            <div className="absolute bottom-2 right-2" data-tour="generate-button">
                                <Button
                                    size="lg"
                                    onClick={() => onGenerate(input)}
                                    disabled={!input.trim() || isGenerating}
                                    className="rounded-xl px-6"
                                >
                                    {isGenerating ? (
                                        <>
                                            <Sparkles className="mr-2 h-4 w-4 animate-spin" />
                                            {t("analyzing_btn")}
                                        </>
                                    ) : (
                                        <>
                                            {t("generate_btn")}
                                            <ArrowRight className="ml-2 h-4 w-4" />
                                        </>
                                    )}
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* 智能建议 */}
                    <div className="mt-12" data-tour="strategy-templates">
                        <SmartSuggestions onSelectSuggestion={handleSelectSuggestion} />
                    </div>

                    <div className="mt-8 flex items-center justify-center gap-8 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <div className="h-1 w-1 rounded-full bg-primary"></div>
                            {t("feature_nlp")}
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="h-1 w-1 rounded-full bg-primary"></div>
                            {t("feature_analysis")}
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="h-1 w-1 rounded-full bg-primary"></div>
                            {t("feature_risk")}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
