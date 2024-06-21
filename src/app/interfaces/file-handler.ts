import { SafeUrl } from "@angular/platform-browser";

export interface FileHandler {
    file: File | null,
    url: SafeUrl
}
