import { CdkStepperModule } from "@angular/cdk/stepper";
import { NgModule } from "@angular/core";

import { FormFieldModule } from "@bitwarden/components";

import { SharedModule } from "../shared.module";
import { VerticalStepperModule } from "../vertical-stepper/vertical-stepper.module";

import { CnetEnterpriseContentComponent } from "./cnet-enterprise-content.component";
import { CnetIndividualContentComponent } from "./cnet-individual-content.component";
import { CnetTeamsContentComponent } from "./cnet-teams-content.component";
import { DefaultContentComponent } from "./default-content.component";
import { EnterpriseContentComponent } from "./enterprise-content.component";
import { Enterprise1ContentComponent } from "./enterprise1-content.component";
import { Enterprise2ContentComponent } from "./enterprise2-content.component";
import { FamiliesContentComponent } from "./families-content.component";
import { LogoCnetComponent } from "./logo-cnet.component";
import { LogoForbesComponent } from "./logo-forbes.component";
import { LogoUSNewsComponent } from "./logo-us-news.component";
import { TeamsContentComponent } from "./teams-content.component";
import { Teams1ContentComponent } from "./teams1-content.component";
import { Teams2ContentComponent } from "./teams2-content.component";
import { TrialInitiationComponent } from "./trial-initiation.component";

@NgModule({
  imports: [SharedModule, CdkStepperModule, VerticalStepperModule, FormFieldModule],
  declarations: [
    TrialInitiationComponent,
    DefaultContentComponent,
    EnterpriseContentComponent,
    Enterprise1ContentComponent,
    Enterprise2ContentComponent,
    FamiliesContentComponent,
    TeamsContentComponent,
    Teams1ContentComponent,
    Teams2ContentComponent,
    CnetEnterpriseContentComponent,
    CnetIndividualContentComponent,
    CnetTeamsContentComponent,
    LogoCnetComponent,
    LogoForbesComponent,
    LogoUSNewsComponent,
  ],
  exports: [TrialInitiationComponent],
})
export class TrialInitiationModule {}

// import { CnetEnterpriseContentComponent } from "./cnet-enterprise-content.component";
// import { CnetIndividualContentComponent } from "./cnet-individual-content.component";
// import { CnetTeamsContentComponent } from "./cnet-teams-content.component";
// import { DefaultContentComponent } from "./default-content.component";
// import { EnterpriseContentComponent } from "./enterprise-content.component";
// import { Enterprise1ContentComponent } from "./enterprise1-content.component";
// import { Enterprise2ContentComponent } from "./enterprise2-content.component";
// import { FamiliesContentComponent } from "./families-content.component";
// import { TeamsContentComponent } from "./teams-content.component";
// import { Teams1ContentComponent } from "./teams1-content.component";
// import { Teams2ContentComponent } from "./teams2-content.component";
// import { TrialInitiationComponent } from "./trial-initiation.component";

// @NgModule({
//   imports: [SharedModule, CdkStepperModule, VerticalStepperModule, FormFieldModule],
//   declarations: [
//     TrialInitiationComponent,
//     CnetEnterpriseContentComponent,
//     CnetIndividualContentComponent,
//     CnetTeamsContentComponent,
//     DefaultContentComponent,
//     EnterpriseContentComponent,
//     Enterprise1ContentComponent,
//     Enterprise2ContentComponent,
//     FamiliesContentComponent,
//     TeamsContentComponent,
//     Teams1ContentComponent,
//     Teams2ContentComponent,
//   ],
//   exports: [TrialInitiationComponent],
// })
// export class TrialInitiationModule {}
