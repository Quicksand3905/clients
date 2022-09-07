import { Directive, EventEmitter, Input, OnDestroy, OnInit, Output } from "@angular/core";
import { concatMap, firstValueFrom, Observable, Subject, takeUntil } from "rxjs";

import { Organization } from "@bitwarden/common/models/domain/organization";
import { ITreeNodeObject } from "@bitwarden/common/models/domain/treeNode";
import { CollectionView } from "@bitwarden/common/models/view/collectionView";
import { FolderView } from "@bitwarden/common/models/view/folderView";

import { DynamicTreeNode } from "../models/dynamic-tree-node.model";
import { VaultFilter } from "../models/vault-filter.model";
import { VaultFilterService } from "../services/vault-filter.service";

@Directive()
export class VaultFilterComponent implements OnInit, OnDestroy {
  @Input() activeFilter: VaultFilter = new VaultFilter();
  @Input() hideFolders = false;
  @Input() hideCollections = false;
  @Input() hideFavorites = false;
  @Input() hideTrash = false;
  @Input() hideOrganizations = false;

  @Output() onFilterChange = new EventEmitter<VaultFilter>();
  @Output() onAddFolder = new EventEmitter<never>();
  @Output() onEditFolder = new EventEmitter<FolderView>();

  isLoaded = false;
  collapsedFilterNodes: Set<string>;
  organizations$: Observable<Organization[]>;
  activePersonalOwnershipPolicy: boolean;
  activeSingleOrganizationPolicy: boolean;
  collections: DynamicTreeNode<CollectionView>;
  folders$: Observable<DynamicTreeNode<FolderView>>;

  private _destroy = new Subject<void>();

  constructor(protected vaultFilterService: VaultFilterService) {}

  get displayCollections() {
    return this.collections?.fullList != null && this.collections.fullList.length > 0;
  }

  async ngOnInit(): Promise<void> {
    this.collapsedFilterNodes = await this.vaultFilterService.buildCollapsedFilterNodes();

    this.organizations$ = this.vaultFilterService.buildOrganizations();

    this.organizations$
      .pipe(takeUntil(this._destroy))
      .pipe(
        concatMap(async (orgs) => {
          if (orgs != null && orgs.length > 0) {
            this.activePersonalOwnershipPolicy =
              await this.vaultFilterService.checkForPersonalOwnershipPolicy();
            this.activeSingleOrganizationPolicy =
              await this.vaultFilterService.checkForSingleOrganizationPolicy();
          }
        })
      )
      .subscribe();

    this.folders$ = await this.vaultFilterService.buildNestedFolders();
    this.collections = await this.initCollections();
    this.isLoaded = true;
  }

  ngOnDestroy(): void {
    this._destroy.next();
    this._destroy.complete();
  }

  // overwritten in web for organization vaults
  async initCollections() {
    return await this.vaultFilterService.buildCollections();
  }

  async toggleFilterNodeCollapseState(node: ITreeNodeObject) {
    if (this.collapsedFilterNodes.has(node.id)) {
      this.collapsedFilterNodes.delete(node.id);
    } else {
      this.collapsedFilterNodes.add(node.id);
    }
    await this.vaultFilterService.storeCollapsedFilterNodes(this.collapsedFilterNodes);
  }

  async applyFilter(filter: VaultFilter) {
    if (filter.refreshCollectionsAndFolders) {
      await this.reloadCollectionsAndFolders(filter);
      filter = await this.pruneInvalidatedFilterSelections(filter);
    }
    this.onFilterChange.emit(filter);
  }

  async reloadCollectionsAndFolders(filter: VaultFilter) {
    this.folders$ = await this.vaultFilterService.buildNestedFolders(filter.selectedOrganizationId);
    this.collections = filter.myVaultOnly
      ? null
      : await this.vaultFilterService.buildCollections(filter.selectedOrganizationId);
  }

  async reloadOrganizations() {
    // this.organizations$ = await this.vaultFilterService.buildOrganizations();
    // this.activePersonalOwnershipPolicy =
    //   await this.vaultFilterService.checkForPersonalOwnershipPolicy();
    // this.activeSingleOrganizationPolicy =
    //   await this.vaultFilterService.checkForSingleOrganizationPolicy();
  }

  addFolder() {
    this.onAddFolder.emit();
  }

  editFolder(folder: FolderView) {
    this.onEditFolder.emit(folder);
  }

  protected async pruneInvalidatedFilterSelections(filter: VaultFilter): Promise<VaultFilter> {
    filter = await this.pruneInvalidFolderSelection(filter);
    filter = this.pruneInvalidCollectionSelection(filter);
    return filter;
  }

  protected async pruneInvalidFolderSelection(filter: VaultFilter): Promise<VaultFilter> {
    if (
      filter.selectedFolder &&
      !(await firstValueFrom(this.folders$))?.hasId(filter.selectedFolderId)
    ) {
      filter.selectedFolder = false;
      filter.selectedFolderId = null;
    }
    return filter;
  }

  protected pruneInvalidCollectionSelection(filter: VaultFilter): VaultFilter {
    if (
      filter.myVaultOnly ||
      (filter.selectedCollection &&
        filter.selectedCollectionId != null &&
        !this.collections?.hasId(filter.selectedCollectionId))
    ) {
      filter.selectedCollection = false;
      filter.selectedCollectionId = null;
    }
    return filter;
  }
}
