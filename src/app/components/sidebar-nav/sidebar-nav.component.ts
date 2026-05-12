import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

interface NavItem {
  label: string;
  route?: string;
}

interface NavSection {
  title: string;
  expanded: boolean;
  items: NavItem[];
}

@Component({
    selector: 'app-sidebar-nav',
    templateUrl: './sidebar-nav.component.html',
    styleUrls: ['./sidebar-nav.component.scss'],
    standalone: false
})
export class SidebarNavComponent implements OnInit, OnDestroy {
  public isSidebarCollapsed = false;
  public isMobileOpen = false;

  public sections: NavSection[] = [
    {
      title: 'Getting Started',
      expanded: false,
      items: [
        { label: 'First Steps' },
      ]
    },
    {
      title: 'Variables',
      expanded: false,
      items: [
        { label: 'Colors', route: '/colors' },
      ]
    },
    {
      title: 'Elements',
      expanded: false,
      items: [
        { label: 'Buttons', route: '/buttons' },
        { label: 'Inputs', route: '/inputs' },
        { label: 'Summary', route: '/summary' },
      ]
    },
    {
      title: 'Components',
      expanded: false,
      items: [
        { label: 'Modal', route: '/modal' },
      ]
    },
    {
      title: 'Utilities',
      expanded: false,
      items: [
        { label: 'Sizes & Spaces', route: '/sizes' },
        { label: 'Display / Flex', route: '/display' },
        { label: 'Fonts', route: '/fonts' },
      ]
    },
    {
      title: 'Design Team',
      expanded: false,
      items: [
        { label: 'Important Notes' },
      ]
    },
  ];

  private routerSub!: Subscription;

  constructor(private readonly router: Router) {}

  public ngOnInit(): void {
    this.expandActiveSection(this.router.url);

    this.routerSub = this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe((e) => {
        this.expandActiveSection(e.urlAfterRedirects);
        this.isMobileOpen = false;
      });
  }

  public ngOnDestroy(): void {
    this.routerSub?.unsubscribe();
  }

  public handleCollapseClick(): void {
    if (window.innerWidth <= 992) {
      this.closeMobileMenu();
    } else {
      this.toggleSidebar();
    }
  }

  public toggleSidebar(): void {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

  public toggleMobile(): void {
    this.isMobileOpen = !this.isMobileOpen;
  }

  public closeMobileMenu(): void {
    this.isMobileOpen = false;
  }

  public toggleSection(index: number): void {
    if (this.isSidebarCollapsed) {
      this.isSidebarCollapsed = false;
      this.sections.forEach((s, i) => (s.expanded = i === index));
      return;
    }

    const section = this.sections[index];
    section.expanded = !section.expanded;
  }

  private expandActiveSection(url: string): void {
    this.sections.forEach((section) => {
      section.expanded = section.items.some(
        (item) => !!item.route && url.startsWith(item.route)
      );
    });
  }
}
