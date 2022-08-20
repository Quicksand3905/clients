// @ts-strict-ignore
import { EventType } from "../enums/eventType";

export abstract class EventService {
  collect: (
    eventType: EventType,
    cipherId?: string,
    uploadImmediately?: boolean,
    organizationId?: string
  ) => Promise<any>;
  uploadEvents: (userId?: string) => Promise<any>;
  clearEvents: (userId?: string) => Promise<any>;
}
