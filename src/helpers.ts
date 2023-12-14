import axios from "axios";
import { Sort, Status, TestWithSite, Type } from "./types/types";

export function trimProtocol(url: string): string {
    return url.replace(/(^\w+:|^)\/\//, '').replace(/^www\./, '');
}

export function generateColor(): string {
    return '#' + Math.floor(Math.random()*16777215).toString(16);
}

const statusSortOrder = ['ONLINE', 'PAUSED', 'STOPPED', 'DRAFT'];

export function sortTests(tests:TestWithSite[], sort: Sort) {
    if(sort.name==='site') {
        if(sort.order==='ASC') {
            return tests.sort((a,b)=>a.site.url>b.site.url?1:-1);
        }
        if(sort.order==='DESC') {
            return tests.sort((a,b)=>a.site.url>b.site.url?-1:1);
        }
    }
    if(sort.name==='status') {
        if(sort.order==='ASC') {
            return tests.sort((a,b)=>statusSortOrder.indexOf(a.status) - statusSortOrder.indexOf(b.status));
        }
        if(sort.order==='DESC') {
            return tests.sort((a,b)=>statusSortOrder.indexOf(b.status) - statusSortOrder.indexOf(a.status));
        }
    }
    if(sort.order==='ASC') {
        return tests.sort((a,b)=>a[sort.name]>b[sort.name]?1:-1);
    }
    if(sort.order==='DESC') {
        return tests.sort((a,b)=>a[sort.name]>b[sort.name]?-1:1);
    }
    return [];
}

export function getStatusColor(status: Status) {
    if(status===Status.ONLINE) {
        return '#1BDA9D';
    }
    if(status===Status.PAUSED) {
        return '#FF8346';
    }
    if(status===Status.STOPPED) {
        return '#FE4848';
    }
}

export function getTypeText(type: Type) {
    if(type===Type.CLASSIC) {
        return 'Classic';
    }
    if(type===Type.MVT) {
        return 'MVT';
    }
    if(type===Type.SERVER_SIDE) {
        return 'Server-side';
    }
}

export async function getTest(id:number) {
    return (await axios.get(`http://localhost:3100/tests/${id}`)).data;
}