import React from 'react';
import { UserPlus, Edit, Share2 } from 'lucide-react'; // Icons ke liye
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const StepCard = ({ icon: Icon, title, description }) => (
    <Card className="text-center p-6 border-2 border-transparent hover:border-purple-500 hover:shadow-lg transition-all duration-300">
        <CardHeader className="flex justify-center items-center">
            <div className="bg-purple-100 dark:bg-purple-900 p-4 rounded-full">
                <Icon className="h-8 w-8 text-purple-600 dark:text-purple-400" />
            </div>
        </CardHeader>
        <CardContent>
            <CardTitle className="text-xl font-bold mb-2">{title}</CardTitle>
            <p className="text-muted-foreground">{description}</p>
        </CardContent>
    </Card>
);

const HowItWorks = () => {
    return (
        <section className="py-20 bg-white dark:bg-slate-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-3xl font-bold mb-4 dark:text-white">Start Your Journey in 3 Simple Steps</h2>
                    <p className="text-lg text-muted-foreground mb-12">
                        From idea to publication, we make it easy for you to share your voice.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <StepCard 
                        icon={UserPlus} 
                        title="1. Create Account"
                        description="Sign up for a free account in seconds and set up your profile."
                    />
                    <StepCard 
                        icon={Edit} 
                        title="2. Write Your Story"
                        description="Use our clean and simple editor to focus on your content and bring your ideas to life."
                    />
                    <StepCard 
                        icon={Share2} 
                        title="3. Publish & Share"
                        description="Publish your post to the world and share it with our growing community of readers."
                    />
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;