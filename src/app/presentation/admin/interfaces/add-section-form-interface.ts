import { FormControl } from "@angular/forms";
import { MiniCourse } from "./minicourse.interface";

export interface AddSectionForm{
    course:FormControl<MiniCourse | null>;
    name:FormControl<string | null>;
    description:FormControl<string | null>;
    duration:FormControl<number | null>;
    video:FormControl<File|null>
  }
