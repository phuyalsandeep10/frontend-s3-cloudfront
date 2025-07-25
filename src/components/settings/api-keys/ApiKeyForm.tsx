
import React from "react";
import { useForm } from "react-hook-form";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";
import { Key } from "lucide-react";

interface ApiKeyFormProps {
  onSubmit: (description: string) => void;
  isGenerating: boolean;
}

interface FormValues {
  description: string;
}

const ApiKeyForm: React.FC<ApiKeyFormProps> = ({ onSubmit, isGenerating }) => {
  const form = useForm<FormValues>({
    defaultValues: {
      description: "",
    },
  });

  const handleSubmit = form.handleSubmit((values) => {
    onSubmit(values.description);
    form.reset();
  });

  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>API Key Description</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="e.g., Zapier Integration, Mobile App" 
                      {...field} 
                      className="w-full md:w-2/3"
                    />
                  </FormControl>
                  <FormDescription>
                    Add a description to help identify where this API key is used.
                  </FormDescription>
                </FormItem>
              )}
            />

            <Button 
              type="submit" 
              className="bg-purple-600 hover:bg-purple-700 dark:bg-purple-600 dark:hover:bg-purple-700" 
              disabled={isGenerating}
            >
              <Key className="mr-2 h-4 w-4" />
              {isGenerating ? "Generating..." : "Generate API Key"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ApiKeyForm;
