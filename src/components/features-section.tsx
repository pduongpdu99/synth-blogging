"use client";

import { MessageCircle, Users, Target, BarChart3 } from "lucide-react";
import { useLanguage } from "./language-provider";

const features = [
  {
    icon: Target,
    key: "teaching",
  },
  {
    icon: MessageCircle,
    key: "interact",
  },
  {
    icon: Users,
    key: "practice",
  },
  {
    icon: BarChart3,
    key: "assess",
  },
];

export function FeaturesSection() {
  const { t } = useLanguage();

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="text-center space-y-4">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-100 rounded-full">
                  <Icon className="h-8 w-8 text-slate-700" />
                </div>
                <h3 className="font-serif font-semibold text-xl text-slate-800">
                  {t(`feature.${feature.key}.title`)}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {t(`feature.${feature.key}.description`)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
