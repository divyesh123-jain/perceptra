"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator";

type FieldType = "text" | "number" | "email" | "textarea";

interface Field {
    id: string;
    label: string;
    type: FieldType;
    placeholder: string;
    required: boolean
}

const FormBuilder = () => {
    const [fields, setFields] = useState<Field[]>([]);

    // Function to add a new field
    const addField = () => {
        const newField: Field = {
            id: Math.random().toString(36).substring(2, 9),
            label: "",
            type: "text",
            placeholder: "",
            required: true
        };
        setFields([...fields, newField]);
    };

    // Function to remove a field
    const removeField = (id: string) => {
        setFields(fields.filter((field) => field.id !== id));
    };

    // Function to update a field's label, type, or value
    const updateField = (id: string, key: keyof Field, value: string) => {
        setFields(fields.map((field) => (field.id === id ? { ...field, [key]: value } : field)));
    };


    // const saveForm = () => {

    // };

    return (
        <div className="flex flex-col p-5 my-6 bg-secondary border rounded-md shadow-md max-w-[800px] w-full mx-auto">
            <h2 className="text-2xl font-semibold mb-5">Form Builder</h2>
            {fields.map((field) => (
                <div key={field.id} className="flex flex-col mb-4 border p-4 gap-3 rounded-md bg-primary-foreground">
                    <div className="grid grid-cols-1 items-center mb-2 gap-3">
                        <div className="flex flex-col gap-3 w-full">
                            <Label className="text-primary font-semibold text-sm">Field Name</Label>
                            <Input
                                type="text"
                                value={field.label}
                                onChange={(e) => updateField(field.id, "label", e.target.value)}
                                placeholder="Field Label"
                            />
                        </div>
           
                    </div>

                    <div className="grid grid-cols-2 gap-3 items-center">
                    <div className="flex flex-col gap-3">
                            <Label className="text-primary font-semibold text-sm">Field Type</Label>
                            <Select
                                value={field.type}
                                onValueChange={(value) => updateField(field.id, "type", value as FieldType)}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Type " />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="text">Text</SelectItem>
                                    <SelectItem value="number">Number</SelectItem>
                                    <SelectItem value="email">Email</SelectItem>
                                    <SelectItem value="textarea">Textarea</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex flex-col gap-3">
                            <Label className="text-primary font-semibold text-sm">Required</Label>
                            <RadioGroup
                                className="mt-2"
                                value={field.required ? "required" : "optional"}
                                onValueChange={(value) => updateField(field.id, "required", value === "required")}
                            >
                                <div className="flex items-center space-x-4">
                                    <label className="flex items-center space-x-2">
                                        <RadioGroupItem value="required" />
                                        <span>Required</span>
                                    </label>
                                    <label className="flex items-center space-x-2">
                                        <RadioGroupItem value="optional" />
                                        <span>Optional</span>
                                    </label>
                                </div>
                            </RadioGroup>

                        </div>
                    </div>

                    <Button variant="destructive" className="mt-2" onClick={() => removeField(field.id)}>
                        Delete
                    </Button>
                </div>
            ))}

            <Separator className="my-5" />

            <Button onClick={addField} className="bg-primary text-secondary">Add Field</Button>
        </div>
    );
};

export default FormBuilder;