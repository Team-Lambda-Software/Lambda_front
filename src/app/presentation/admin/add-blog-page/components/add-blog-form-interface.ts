import { FormControl } from "@angular/forms";

export interface AddBlogForm{
    titulo:FormControl<string | null>;
    contenido:FormControl<string | null>;
    categoria:FormControl<string | null>;
    entrenador:FormControl<string | null>;
    etiquetas:FormControl<string | null>;
  }
  