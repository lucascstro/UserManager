import { Component, isStandalone, ViewChild } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { Users } from '../../interfaces/users';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrl: './manager.component.scss',
})
export class ManagerComponent {
  dataSource: any;
  
  displayedColumns: string[] = [
    'firebaseId',
    'name',
    'email',
    'sector',
    'role',
    'benefits',
    'actions',
  ];

  listaUsuarios: Users[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private userServices: UsersService) {
    this.dataSource = new MatTableDataSource<any>(this.listaUsuarios);
  }

  ngOnInit() {
    this.getListUser();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getListUser() {
    return this.userServices.getAllUsers().subscribe({
      next: (response: any) => {
        console.log(response);
        this.listaUsuarios = response;
        this.dataSource = new MatTableDataSource<any>(this.listaUsuarios);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err: any) => {
        console.error(err);
      },
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
